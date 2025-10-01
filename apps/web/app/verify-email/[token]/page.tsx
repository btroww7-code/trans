import VerifyEmail from '../../../components/auth/VerifyEmail';

export default function VerifyEmailPage({ params }) {
  return <VerifyEmail token={params.token} />;
}
