import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  Center,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconAt, IconLock } from '@tabler/icons-react';

import { notifications } from '@mantine/notifications';

export function Login({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const theme = useMantineTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: any) => {
    return new Promise((resolve) => setTimeout(resolve, 1500)).then(() => {
      notifications.show({
        title: 'Welcome Back!',
        message: 'You have successfully logged in.',
        color: 'green',
      });
    });
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        padding: '20px',
      }}
    >
      <Container size={420} w="100%">
        <Center mb={30}>
          <Box
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #339af0, #15aabf)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: 800,
              boxShadow: '0 8px 15px rgba(255, 255, 255, 1)'
            }}
          >
            KTM
          </Box>
        </Center>

        <Title ta="center" style={{ fontFamily: 'Inter, sans-serif' }} fw={900}>
          Welcome back
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button" fw={500} onClick={onSwitchToRegister}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="xl" p={40} mt={30} radius="lg" style={{
          transition: 'box-shadow 0.3s ease',
        }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              leftSection={<IconAt size={18} stroke={1.5} />}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message as string}
              size="md"
              radius="md"
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              leftSection={<IconLock size={18} stroke={1.5} />}
              mt="lg"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message as string}
              size="md"
              radius="md"
            />

            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" size="sm" {...register('remember')} />
              <Anchor component="button" size="sm" fw={500}>
                Forgot password?
              </Anchor>
            </Group>

            <Button
              fullWidth
              mt="xl"
              size="md"
              radius="md"
              type="submit"
              loading={isSubmitting}
              style={{
                background: 'linear-gradient(45deg, #339af0, #15aabf)',
                transition: 'transform 0.2s',
                border: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
