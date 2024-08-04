import { TextInput, Modal, Button, Stack, ActionIcon, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { PermissionType, permissionTypeSchema } from '@/schema/permission.schema';
import {
  useCreatePermissionMutation,
  useDeletePermissionMutation,
  useUpdatePermissionMutation,
} from '../query';

export type PermissionFormProps = {
  onSubmit: (values: PermissionType) => void;
  initialValues?: PermissionType;
  onCancel?: () => void;
};

export function PermissionForm({ onSubmit, initialValues, onCancel }: PermissionFormProps) {
  const form = useForm<PermissionType>({
    initialValues: initialValues ?? {
      name: '',
      label: '',
      flag: false,
    },
    validate: zodResolver(permissionTypeSchema),
  });

  const handleSubmit = (values: PermissionType) => onSubmit(values);

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
  const { mutate: createPermission } = useCreatePermissionMutation();
  const handleCreate = (values: PermissionType) => {
    createPermission(values);
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Permission">
        <PermissionForm onSubmit={handleCreate} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.permissions} scopes={[SCOPES.canCreate]}>
        <Button onClick={open}>Add Permission</Button>
      </PermissionsGate>
    </>
  );
}

export function UpdateModalButton({ prevValues }: { prevValues: PermissionType }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updatePermission } = useUpdatePermissionMutation();

  const handleUpdate = (values: PermissionType) => {
    updatePermission(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Permission">
        <PermissionForm onSubmit={handleUpdate} initialValues={prevValues} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.permissions} scopes={[SCOPES.canEdit]}>
        <ActionIcon onClick={open} variant="subtle">
          <IconEdit />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function DeleteModalButton({ id }: { id: number }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deletePermission } = useDeletePermissionMutation();

  const handleDelete = () => {
    deletePermission(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Task Type">
        <Stack>
          <Text>Are you sure you want to delete this permission?</Text>
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

      <PermissionsGate page={PAGE.permissions} scopes={[SCOPES.canDelete]}>
        <ActionIcon onClick={open} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}
