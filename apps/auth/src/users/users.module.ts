import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserDocument, UserSchema } from './model/user.schema';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeatureAsync([
      {
        name: UserDocument.name,
        useFactory: () => {
          const schema = UserSchema;

          //Pre-save actions:
          schema.pre('save', async function (next) {
            const user: any = this;
            const hasPasswordField = user.isModified('password');
            if (!hasPasswordField) return next();
            const saltOrRounds = 10;
            user.password = await bcrypt.hash(user.password, saltOrRounds);
            next();
          });
          return schema;
        },
      },
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
