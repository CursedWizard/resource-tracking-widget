import React, { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  SystemStyleObject,
} from "@chakra-ui/react";
import { MemberRow } from "./member-row";
import { TagsInputProps } from "@jetbrains/ring-ui/dist/tags-input/tags-input";
import { observer } from "mobx-react-lite";
import { TagType } from "../types/resource-planning";
import { useTableStore } from "../slices/table-slice";
import { deepCloneMap } from "../utils/map-utils";
import { SelectItem } from "@jetbrains/ring-ui/dist/select/select";

interface Props {
  projects: SelectItem<unknown>[];
  editing: boolean;
}

export const ResourceTable: React.FC<Props> = observer((props) => {
  const { projects, editing } = props;
  const tHeadStyles: SystemStyleObject = {
    bg: "#F9F9F9",
    textTransform: "none",
    color: "#000",
    fontFamily: "var(--ring-font-family)",
    fontSize: "var(--ring-font-size)",
    letterSpacing: "0.1px",
  };

  const { users, rowData, removeMember, addTag, removeTag } = useTableStore();

  const handleDeleteUser = (name: string) => {
    removeMember(name);
  };

  return (
    <TableContainer mb="12px">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Понедельник</Th>
            <Th>Вторник</Th>
            <Th>Среда</Th>
            <Th>Четверг</Th>
            <Th>Пятница</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((name, key) => (
            <MemberRow
              key={`${name}-${key}`}
              onUserDelete={handleDeleteUser}
              tags={rowData.get(name)}
              onTagAdd={(params, day) =>
                addTag(params.tag as TagType, day, name)
              }
              onTagRemove={(params, day) =>
                removeTag(params.tag as TagType, day, name)
              }
              editing={editing}
              name={name}
              projects={projects}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});
