import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserEntity } from '../../users/entities/user.entity';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UsersSerializer } from '../serializers/users.serializer';

@Injectable()
export class UsersUnitOfWork {
  constructor(private prisma: PrismaService) {}

  async createSocialProfile(
    registerUserDto: RegisterUserDto,
    hashedPassword: string,
  ): Promise<UserEntity> {
    const { email, phone, gender, name } = registerUserDto;
    try {
      return await this.prisma.$transaction(async (tx: PrismaService) => {
        // 1. Create the user
        const user: UserEntity = await tx.user.create({
          data: {
            email,
            phone,
            name,
            password: hashedPassword,
          },
          select: UsersSerializer,
        });

        // 2. Associate the user with an internal user entity
        await tx.socialProfile.create({
          data: {
            gender,
            user: { connect: { id: user.id } },
          },
        });

        return user;
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException('Could not create user');
    }
  }
}
