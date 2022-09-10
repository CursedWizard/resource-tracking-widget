import React, { useCallback } from "react";
import {
  TagsInputProps,
  ToggleTagParams,
} from "@jetbrains/ring-ui/dist/tags-input/tags-input";
import {
  Tr,
  Td,
  SystemStyleObject,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import Button from "@jetbrains/ring-ui/dist/button/button";
import TagsInput from "@jetbrains/ring-ui/dist/tags-input/tags-input";
import trashIcon from "@jetbrains/icons/trash";
import Tag from "@jetbrains/ring-ui/dist/tag/tag";
import { DayOfWeek } from "../types/application";
import { TagType } from "../types/resource-planning";
import { ProjectsSelect } from "../components/projects-select";
import { SelectItem } from "@jetbrains/ring-ui/dist/select/select";

type TagsByDay = {
  [key in DayOfWeek]?: {
    tags: TagType[];
  };
};

interface Props {
  projects: SelectItem<unknown>[];
  name: string;
  editing: boolean;
  onTagAdd: (params: ToggleTagParams, day: DayOfWeek) => void;
  onTagRemove: (params: ToggleTagParams, day: DayOfWeek) => void;
  onUserDelete: (name: string) => void;
  tags?: TagsByDay;
}

const AssignedTags: React.FC<{ tags: TagType[] }> = ({ tags }) => {
  return (
    <Flex gap="4px" wrap="wrap">
      {tags.map((value, index) => (
        <Tag key={index} readOnly>
          {value.label}
        </Tag>
      ))}
    </Flex>
  );
};

export const MemberRow: React.FC<Props> = (props) => {
  const { projects, editing, name, onTagAdd, onTagRemove, onUserDelete, tags } =
    props;
  const tDataStyles: SystemStyleObject = {
    minWidth: "60px",
    maxW: "150px"
  };

  const handleUserDelete = useCallback(() => {
    onUserDelete(name);
  }, [onUserDelete, name]);

  return (
    <Tr>
      <Td
        sx={{
          paddingInlineStart: "0.75rem",
          paddingInlineEnd: "0.75rem",
        }}
      >
        <HStack alignItems="center">
          {editing && <Button onClick={handleUserDelete} icon={trashIcon} />}
          <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {name}
          </Text>
        </HStack>
      </Td>
      {Object.values(DayOfWeek)
        .filter((value) => typeof value !== "string")
        .map((value: number) => {
          const aTags = tags
            ? tags[value as DayOfWeek]?.tags.map((value) => value) ?? []
            : [];

          return (
            <Td key={value} sx={tDataStyles}>
              {editing ? (
                <ProjectsSelect
                  maxPopupHeight={300}
                  onTagAdd={(params) => onTagAdd(params, value)}
                  onTagRemove={(params) => onTagRemove(params, value)}
                  options={projects}
                  tags={aTags}
                />
              ) : (
                <AssignedTags tags={aTags} />
              )}
            </Td>
          );
        })}
    </Tr>
  );
};
