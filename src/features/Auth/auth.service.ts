import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma-client/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userEmail: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });
    const checkPassword = await compare(pass, user?.password);
    if (!checkPassword) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    const payload = {
      id: user.id,
      user_name: user.name,
      email: user.email,
      image_profile: user.image_profile,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUser: RegisterAuthDto) {
    const { password } = createUser;
    const textToHash = await hash(password, 10);
    createUser = { ...createUser, password: textToHash };
    const authCreated = await this.prisma.user.create({ data: createUser });

    const payload = {
      id: authCreated.id,
      user_name: authCreated.name,
      email: authCreated.email,
      image_profile: authCreated.image_profile,
    };
    const token = this.jwtService.sign(payload);
    const data = {
      access_token: token,
    };
    return data;
  }
}
