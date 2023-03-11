import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { InternalProfilesModule } from './internal-profiles/internal-profiles.module';
import { InternalInvitationsModule } from './internal-invitations/internal-invitations.module';
import { InternalRolesModule } from './internal-roles/internal-roles.module';
import { OrganizationInvitationsModule } from './organization-invitations/organization-invitations.module';
import { OrganizationProfilesModule } from './organization-profiles/organization-profiles.module';
import { UserDepartmentsModule } from './user-departments/user-departments.module';
import { SocialProfilesModule } from './social-profiles/social-profiles.module';

@Module({
  imports: [
    UsersModule,
    InternalProfilesModule,
    InternalInvitationsModule,
    InternalRolesModule,
    OrganizationInvitationsModule,
    OrganizationProfilesModule,
    UserDepartmentsModule,
    SocialProfilesModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
