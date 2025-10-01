import { Form, Input, Button, Card } from 'shadcn-ui';
import { useAuth } from '../../context/AuthContext';

export default function RegisterForm() {
  // ...form logic, error handling, toast notifications...
  return (
    <Card>
      <Form>
        <Form.Field>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Input id="email" name="email" type="email" required />
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Input id="password" name="password" type="password" required />
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" required />
        </Form.Field>
        <Form.Field>
          <Form.Label>Role</Form.Label>
          <Form.RadioGroup name="role" required>
            <Form.Radio value="user" id="role-user" label="User" />
            <Form.Radio value="provider" id="role-provider" label="Provider" />
          </Form.RadioGroup>
        </Form.Field>
        <Form.Field>
          <Form.Checkbox name="terms" required>
            I agree to the terms and conditions
          </Form.Checkbox>
        </Form.Field>
        <Button type="submit">Register</Button>
      </Form>
    </Card>
  );
}