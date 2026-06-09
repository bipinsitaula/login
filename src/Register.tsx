import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Box,
  Center,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconAt, IconLock, IconUser } from '@tabler/icons-react';

import { notifications } from '@mantine/notifications';

export function Register({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      notifications.show({
        title: 'Success',
        message: 'Account created successfully! Please login.',
        color: 'green',
      });
      onSwitchToLogin();
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Failed to create account. Email might already be taken.',
        color: 'red',
      });
    }
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
          Create an account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
          Already have an account?{' '}
          <Anchor size="sm" component="button" fw={500} onClick={onSwitchToLogin}>
            Sign in
          </Anchor>
        </Text>

        <Paper withBorder shadow="xl" p={40} mt={30} radius="lg" style={{
          transition: 'box-shadow 0.3s ease',
        }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Name"
              placeholder="Your Name"
              leftSection={<IconUser size={18} stroke={1.5} />}
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message as string}
              size="md"
              radius="md"
            />
            <TextInput
              label="Email"
              placeholder="you@example.com"
              leftSection={<IconAt size={18} stroke={1.5} />}
              mt="lg"
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
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              leftSection={<IconLock size={18} stroke={1.5} />}
              mt="lg"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) => {
                  if (watch('password') != val) {
                    return 'Your passwords do no match';
                  }
                },
              })}
              error={errors.confirmPassword?.message as string}
              size="md"
              radius="md"
            />

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
              Sign up
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
