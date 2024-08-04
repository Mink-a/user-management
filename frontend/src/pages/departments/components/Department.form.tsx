import { TextInput, Modal, Button, Stack, ActionIcon, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { DepartmentType, departmentTypeSchema } from '@/schema/department.schema';
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} from '../query';

export type DepartmentFormProps = {
  onSubmit: (values: DepartmentType) => void;
  initialValues?: DepartmentType;
  onCancel?: () => void;
};

export function DepartmentForm({ onSubmit, initialValues, onCancel }: DepartmentFormProps) {
  const form = useForm<DepartmentType>({
    initialValues: initialValues ?? {
      name: '',
      label: '',
    },
    validate: zodResolver(departmentTypeSchema),
  });

  const handleSubmit = (values: DepartmentType) => onSubmit(values);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Enter name"
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="Label"
          placeholder="Enter label"
          {...form.getInputProps('label')}
        />
        <Group justify="flex-end">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export function CreateModalButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createDepartment } = useCreateDepartmentMutation();
  const handleCreate = (values: DepartmentType) => {
    createDepartment(values);
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Department">
        <DepartmentForm onSubmit={handleCreate} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.departments} scopes={[SCOPES.canCreate]}>
        <Button onClick={open}>Add Department</Button>
      </PermissionsGate>
    </>
  );
}

export function UpdateModalButton({ prevValues }: { prevValues: DepartmentType }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateDepartment } = useUpdateDepartmentMutation();

  const handleUpdate = (values: DepartmentType) => {
    updateDepartment(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Department">
        <DepartmentForm onSubmit={handleUpdate} initialValues={prevValues} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.departments} scopes={[SCOPES.canEdit]}>
        <ActionIcon onClick={open} variant="subtle">
          <IconEdit />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function DeleteModalButton({ id }: { id: number }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteDepartment } = useDeleteDepartmentMutation();

  const handleDelete = () => {
    deleteDepartment(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Task Type">
        <Stack>
          <Text>Are you sure you want to delete this department?</Text>
          <Group justify="flex-end">
            <Button onClick={handleDelete} color="red">
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal>

      <PermissionsGate page={PAGE.departments} scopes={[SCOPES.canDelete]}>
        <ActionIcon onClick={open} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}
