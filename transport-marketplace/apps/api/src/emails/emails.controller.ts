import { Controller, Get, Param } from '@nestjs/common';
import { render } from '@react-email/render';
import { WelcomeEmail } from './templates/WelcomeEmail';
import { VerifyEmailEmail } from './templates/VerifyEmailEmail';

@Controller('emails')
export class EmailsController {
  @Get('preview/:template')
  preview(@Param('template') template: string) {
    let html = '';
    if (template === 'welcome') html = render(<WelcomeEmail user={{ email: 'test@example.com' }} />);
    if (template === 'verify') html = render(<VerifyEmailEmail user={{ email: 'test@example.com' }} verifyUrl="https://example.com/verify" />);
    return html;
  }
}
