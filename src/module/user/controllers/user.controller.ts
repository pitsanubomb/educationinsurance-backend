import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { UserService } from '../services/user.service'
import { CreateUserDTO, UserDTO } from '../userdto/user.dto'

@Controller('user')
@ApiUseTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({
    title: 'เพิ่มผู้ใช้งาน',
    description: 'เพิ่มผู้ใช้งานเพื่อเข้าใช้งานระบบ',
    operationId: 'Create Users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO,
    description: 'เพิ่มผู้ใช้งานสำเร็จ',
  })
  async create(@Body() userBody: CreateUserDTO) {
    try {
      const userRes = await this.userService.createUser(userBody)
      return userRes.toDto()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('login')
  @ApiOperation({
    title: 'เข้าสู่ระบบ',
    description: 'เข้าสู่ระบบเพื่อใช้งาน และ ได้สิทธิ์',
    operationId: 'Login User',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO,
    description: 'เข้าสู่ระบบสำเร็จ',
  })
  async login(@Body() userBody: CreateUserDTO) {
    try {
      const loginRes = await this.userService.loginUser(
        userBody.username,
        userBody.username,
      )
      return loginRes.toDto()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
