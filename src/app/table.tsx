import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  SystemStyleObject,
  Box,
  ChakraProvider,
} from "@chakra-ui/react";
import { MemberRow } from "./member-row";
import { TagsInputProps } from "@jetbrains/ring-ui/dist/tags-input/tags-input";
import _ from "lodash";
import { tableDataStore } from "../utils/table-data";
import { observer } from "mobx-react-lite";

interface Props {
  projects: TagsInputProps["dataSource"];
  editing: boolean;
}

export const ResourceTable: React.FC<Props> = observer((props) => {
  const { projects, editing } = props;
  const tHeadStyles: SystemStyleObject = {
    bg: "#F9F9F9",
    textTransform: "none",
    color: "#000",
  };

  const handleDeleteUser = (name: string) => {
    tableDataStore.removeMember(name);
  };

  return (
    <TableContainer mb="12px">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th sx={tHeadStyles}></Th>
            <Th sx={tHeadStyles}>Понедельник</Th>
            <Th sx={tHeadStyles}>Вторник</Th>
            <Th sx={tHeadStyles}>Среда</Th>
            <Th sx={tHeadStyles}>Четверг</Th>
            <Th sx={tHeadStyles}>Пятница</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(tableDataStore.tagsByMember).map((name) => (
            <MemberRow
              onDeleteUser={handleDeleteUser}
              tags={tableDataStore.tagsByMemberEditing[name]}
              onAddTag={(params, day) =>
                tableDataStore.addTag(params, day, name)
              }
              onRemoveTag={(params, day) =>
                tableDataStore.removeTag(params, day, name)
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
