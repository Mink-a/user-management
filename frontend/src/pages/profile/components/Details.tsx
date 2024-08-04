import { Table } from '@mantine/core';
import React from 'react';

type DetailsProps = {
  children: React.ReactNode;
};

export function Details({ children }: React.PropsWithChildren<DetailsProps>) {
  return (
    <Table>
      <Table.Tbody>{children}</Table.Tbody>
    </Table>
  );
}

type DetailsItemProps = {
  label: string;
  value: string | null | React.ReactNode;
};

export function DetailsItem({ label, value }: DetailsItemProps) {
  if (!value) return null;

  return (
    <>
      {typeof value === 'object' ? (
        Object.entries(value).map(([key, val]) => (
          <Table.Tr key={key} style={{ color: '#4E4B66' }}>
            <Table.Td style={{ padding: '10px', width: '300px', textTransform: 'capitalize' }}>
              {label} ({key})
            </Table.Td>
            <Table.Td style={{ padding: '10px', width: 'auto' }}>
              {val ? val.toString() : val}
            </Table.Td>
          </Table.Tr>
        ))
      ) : (
        <Table.Tr style={{ color: '#4E4B66' }}>
          <Table.Td style={{ padding: '10px', width: '300px', textTransform: 'capitalize' }}>
            {label}
          </Table.Td>
          <Table.Td style={{ padding: '10px', width: 'auto' }}>
            {value ? value.toString() : value}
          </Table.Td>
        </Table.Tr>
      )}
    </>
  );
}
