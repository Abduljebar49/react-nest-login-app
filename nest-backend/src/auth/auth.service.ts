import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email }).select('email password name');
    if (!user) {
      throw new NotFoundException(`Incorrect email or password`);
    }
    const passwordCheck = await this.checkPassword(
      loginDto.password,
      user.password,
    );
    if (!passwordCheck) {
      throw new NotFoundException(`Incorrect email or password`);
    }
    const userData = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    return {
      access_token: await this.jwtService.signAsync(userData),
      user: { ...userData, password: null },
    };
  }

  async signUp(userDto: CreateUserDto) {
    try {
      // await this.service.findAll()
      const hashedPassword = await this.encryptPassword(userDto.password);
      const newStudent = new this.userModel({
        name: userDto.name,
        email: userDto.email,
        password: hashedPassword,
      });
      return await newStudent.save();
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'This is a custom message',
        message: "Duplicate email"
      }, HttpStatus.CONFLICT, {
        cause: error
      });
    }
  }

  async profile(email:string){
    const user:IUser =  await this.userModel.findOne({email})
    return user;
  }

  async checkPassword(password: string, existingPassword: string) {
    return await bcrypt.compare(password, existingPassword);

  }

  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
