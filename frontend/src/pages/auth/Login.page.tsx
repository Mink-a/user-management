import { Button, Card, Center, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { loginSchema, type Login } from '@/schema/login.schema';
import { useLoginMutation } from './query';
import { useAuthRoute } from '@/hooks/useAuth';

export function LoginPage() {
  useAuthRoute();
  const { mutate } = useLoginMutation();
  const form = useForm<Login>({
    initialValues: {
      email: 'super.admin@example.com',
      password: 'password',
    },
    validate: zodResolver(loginSchema),
  });

  const handleLogin = (values: Login) => {
    mutate(values);
  };

  return (
    <Center h="100vh" bg="gray.2">
      <Card radius="md" style={{ width: '400px' }} withBorder p="xl">
        <Card.Section>
          <Title order={2} mb="lg">
            Login
          </Title>
        </Card.Section>
        <Card.Section>
          <form onSubmit={form.onSubmit(handleLogin)}>
            <Stack>
              <TextInput
                withAsterisk
                label="Email"
                placeholder="Email"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                withAsterisk
                label="Password"
                placeholder="Password"
                type="password"
                {...form.getInputProps('password')}
              />
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Card.Section>
      </Card>
    </Center>
  );
}
