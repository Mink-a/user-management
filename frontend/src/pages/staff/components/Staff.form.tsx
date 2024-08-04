import {
  TextInput,
  Modal,
  Button,
  Stack,
  ActionIcon,
  Text,
  Group,
  NumberInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { DatePickerInput } from '@mantine/dates';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { useCreateStaffMutation, useDeleteStaffMutation, useUpdateStaffMutation } from '../query';
import { staffSchema, StaffType } from '@/schema/staff.schema';
import { DepartmentSelect } from '@/components/inputs/DepartmentSelect';

export type StaffFormProps = {
  onSubmit: (values: StaffType) => void;
  initialValues?: StaffType;
  onCancel?: () => void;
};

export function StaffForm({ onSubmit, initialValues, onCancel }: StaffFormProps) {
  const form = useForm<StaffType>({
    initialValues: initialValues ?? {
      name: '',
      email: '',
      mobile: '',
      depId: 1,
      age: 20,
      gender: 'Male',
      status: 'Active',
      code: 'staff_',
      position: 'Manager',
      joinedDate: new Date().toISOString(),
      createdBy: 1,
      updatedBy: 1,
    },
    validate: zodResolver(staffSchema),
  });

  const handleSubmit = (values: StaffType) => {
    const { department, users, ...val } = values;
    onSubmit(val);
  };

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
          label="Email"
          placeholder="Enter email"
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Mobile"
          placeholder="Enter mobile"
          {...form.getInputProps('mobile')}
        />
        <TextInput
          withAsterisk
          label="Code"
          placeholder="Enter code"
          {...form.getInputProps('code')}
        />
        <TextInput
          withAsterisk
          label="Position"
          placeholder="Enter position"
          {...form.getInputProps('position')}
        />
        <DatePickerInput
          withAsterisk
          label="Join Date"
          placeholder="Enter join date"
          {...form.getInputProps('joinDate')}
          value={new Date(form.values.joinedDate)}
        />
        <DepartmentSelect {...form.getInputProps('depId')} />
        <NumberInput
          withAsterisk
          label="Age"
          placeholder="Enter age"
          {...form.getInputProps('age')}
        />
        {/* <Select
          withAsterisk
          label="Gender"
          placeholder="Enter gender"
          data={['Male', 'Female']}
          {...form.getInputProps('gender')}
        /> */}
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
  const { mutate: createStaff } = useCreateStaffMutation();
  const handleCreate = (values: StaffType) => {
    createStaff(values);
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Staff">
        <StaffForm onSubmit={handleCreate} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.staffs} scopes={[SCOPES.canCreate]}>
        <Button onClick={open}>Add Staff</Button>
      </PermissionsGate>
    </>
  );
}

export function UpdateModalButton({ prevValues }: { prevValues: StaffType }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateStaff } = useUpdateStaffMutation();

  const handleUpdate = (values: StaffType) => {
    updateStaff(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Staff">
        <StaffForm onSubmit={handleUpdate} initialValues={prevValues} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.staffs} scopes={[SCOPES.canEdit]}>
        <ActionIcon onClick={open} variant="subtle">
          <IconEdit />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function DeleteModalButton({ id }: { id: number }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteStaff } = useDeleteStaffMutation();

  const handleDelete = () => {
    deleteStaff(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Task Type">
        <Stack>
          <Text>Are you sure you want to delete this staff?</Text>
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

      <PermissionsGate page={PAGE.staffs} scopes={[SCOPES.canDelete]}>
        <ActionIcon onClick={open} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function ViewDetailsLink({ id }: { id: number }) {
  const navigate = useNavigate();
  return (
    <PermissionsGate page={PAGE.staffs} scopes={[SCOPES.canView]}>
      <ActionIcon
        onClick={() => navigate(`/d/staffs/${id}`)}
        variant="subtle"
        color="blue"
        title="View Details"
      >
        <IconEye />
      </ActionIcon>
    </PermissionsGate>
  );
}
