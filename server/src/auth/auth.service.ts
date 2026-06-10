import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: any) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          // Optionally, you can also check if the phone number is already taken
          // { phoneNumbers: { hasSome: data.phoneNumbers } }
        ]
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phoneNumbers: data.phoneNumbers || [],
      },
    });

    const { password, ...result } = user;
    return result;
  }

  async login(data: { identifier: string; password: string }) {
    // Search for a user by email OR if the phoneNumbers array contains the identifier
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.identifier },
          { phoneNumbers: { has: data.identifier } },
        ],
      },
    });

    // If no user is found with that email or phone number
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Strip the password from the response object
    const { password, ...result } = user;
    
    return result; 
  }
}