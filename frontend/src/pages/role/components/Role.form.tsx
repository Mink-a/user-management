import { TextInput, Modal, Button, Stack, ActionIcon, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { RoleType, roleTypeSchema } from '@/schema/role.schema';
import { useCreateRoleMutation, useDeleteRoleMutation, useUpdateRoleMutation } from '../query';
import { PermissionsSelect } from '@/components/inputs/PermissionsSelect';

export type RoleFormProps = {
  onSubmit: (values: RoleType) => void;
  initialValues?: RoleType;
  onCancel?: () => void;
};

export function RoleForm({ onSubmit, initialValues, onCancel }: RoleFormProps) {
  const form = useForm<RoleType>({
    initialValues: initialValues ?? {
      name: '',
      label: '',
      permissions: [1],
      flag: false,
    },
    validate: zodResolver(roleTypeSchema),
  });

  const handleSubmit = (values: RoleType) => onSubmit(values);

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
        <PermissionsSelect
          label="Permissions"
          placeholder="Select permissions"
          {...form.getInputProps('permissions')}
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
  const { mutate: createRole } = useCreateRoleMutation();
  const handleCreate = (values: RoleType) => {
    createRole(values);
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Role">
        <RoleForm onSubmit={handleCreate} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.roles} scopes={[SCOPES.canCreate]}>
        <Button onClick={open}>Add Role</Button>
      </PermissionsGate>
    </>
  );
}

export function UpdateModalButton({ prevValues }: { prevValues: RoleType }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateRole } = useUpdateRoleMutation();

  const handleUpdate = (values: RoleType) => {
    updateRole(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Permission">
        <RoleForm onSubmit={handleUpdate} initialValues={prevValues} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.roles} scopes={[SCOPES.canEdit]}>
        <ActionIcon onClick={open} variant="subtle">
          <IconEdit />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function DeleteModalButton({ id }: { id: number }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteRole } = useDeleteRoleMutation();

  const handleDelete = () => {
    deleteRole(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Task Type">
        <Stack>
          <Text>Are you sure you want to delete this role?</Text>
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

      <PermissionsGate page={PAGE.roles} scopes={[SCOPES.canDelete]}>
        <ActionIcon onClick={open} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}
