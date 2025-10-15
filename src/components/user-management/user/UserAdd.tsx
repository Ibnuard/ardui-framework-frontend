"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/schemas/userSchema";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

export default function UserAdd() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
  });

  return (
    <div>
      <PageBreadcrumb pageTitle="Create User" />
      <ComponentCard title="User Data">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <div>
              <Label required>Username</Label>
              <Input
                placeholder="Username"
                onChange={field.onChange}
                error={!!errors.username}
                hint={errors.username?.message}
              />
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <Label required>Email</Label>
              <Input
                type={"email"}
                placeholder="Email"
                onChange={field.onChange}
                error={!!errors.email}
                hint={errors.email?.message}
              />
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <Label required>Password</Label>
              <Input
                type={"password"}
                placeholder="Password"
                onChange={field.onChange}
                error={!!errors.password}
                hint={errors.password?.message}
              />
            </div>
          )}
        />
      </ComponentCard>
    </div>
  );
}
