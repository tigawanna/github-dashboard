import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { UserPage } from './-components/user/UserPage';



export const Route = createFileRoute("/$user/")({
  component: UserPage,
});


