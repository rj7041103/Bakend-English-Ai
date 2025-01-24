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
    const payload = { sub: user.id, username: user.email };
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
      name: authCreated.name,
      email: authCreated.email,
    };
    const token = this.jwtService.sign(payload);
    const data = {
      user: authCreated,
      token: token,
    };
    return data;
  }
}
