'use client';

import { creationFormSchema, CreationFormValues } from '@/shared/constants/creation-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Container, Title, CreationForm } from '.';
import toast from 'react-hot-toast';
import { Button } from '..';
import Link from 'next/link';
import { useAppDispatch } from '@/shared/store';
import { addCharacter } from '@/shared/store/creation';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

export const CreationContent: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Инициализация формы
  const form = useForm<CreationFormValues>({
    resolver: zodResolver(creationFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: CreationFormValues) => {
    const newCharacter = { id: Date.now().toString(), name: data.name };

    dispatch(addCharacter(newCharacter));
    toast.success('Character added successfully!');

    form.reset(); // Сбрасываем форму

    // Редирект на страницу /change после успешного создания
    router.push('/change');
  };
  // const onSubmit = (data: CreationFormValues) => {
  //   const newCharacter = { id: Date.now().toString(), name: data.name };

  //   dispatch(addCharacter(newCharacter)); // Добавление персонажа в Redux
  // };

  return (
    <Container className="mt-10">
      <div className="flex justify-center flex-col items-center mx-auto">
        <Title text="Create your character" className="font-extrabold mb-8 text-[36px]" />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row lg:gap-10">
              <div className="flex justify-center">
                <CreationForm />
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                className="uppercase font-mono text-[20px] tracking-[10px] mr-10"
                variant={'ghost'}
                type="submit"
              >
                Create
              </Button>

              <Link href="/change">
                <Button
                  type="button"
                  className="uppercase font-mono text-[20px] tracking-[10px]"
                  variant={'ghost'}
                >
                  Back to List
                </Button>
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </Container>
  );
};
