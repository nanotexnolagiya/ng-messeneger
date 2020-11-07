import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { MembersComponent } from './members/members.component';
import { ListChatComponent } from './list-chat/list-chat.component';
import { SettingsComponent } from './settings/settings.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

const routes: Routes = [
  { path: '', component: SignInComponent, },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'user', component: UserComponent, children: [
    {path: '', component: MembersComponent},
    {path: 'list-chat', component: ListChatComponent},
    {path: 'list-contact', component: ListContactComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'list-chat/:id', component: ChatPageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
