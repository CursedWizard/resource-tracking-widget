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

type TagsByDay = {
  [key in DayOfWeek]?: {
    tags: TagType[];
  };
};

interface Props {
  projects: TagsInputProps["dataSource"];
  name: string;
  editing: boolean;
  onAddTag: (params: ToggleTagParams, day: DayOfWeek) => void;
  onRemoveTag: (params: ToggleTagParams, day: DayOfWeek) => void;
  tags?: TagsByDay;
  onDeleteUser: (name: string) => void;
}

const PLACEHOLDER = "Выберите проект";

const AssignedTags: React.FC<{ tags: TagType[] }> = ({ tags }) => {
  return (
    <Flex wrap="wrap">
      {tags.map((value, index) => (
        <Tag key={index} readOnly>
          {value.label}
        </Tag>
      ))}
    </Flex>
  );
};

export const MemberRow: React.FC<Props> = (props) => {
  const { projects, editing, name, onAddTag, onRemoveTag, onDeleteUser: onUserDelete, tags } =
    props;
  const tDataStyles: SystemStyleObject = {
    width: "250px",
  };

  const handleUserDelete = useCallback(() => {
    onUserDelete(name);
  }, [onUserDelete, name]);

  return (
    <Tr>
      <Td>
        <HStack alignItems="center">
          {editing && <Button onClick={handleUserDelete} icon={trashIcon} />}
          <Text
            sx={{
              fontFamily: "var(--ring-font-family)",
              fontSize: "var(--ring-font-size)",
            }}
          >
            {name}
          </Text>
        </HStack>
      </Td>
      {Object.values(DayOfWeek)
        .filter((value) => typeof value !== "string")
        .map((value: number) => {
          const aTags = tags ? tags[value as DayOfWeek]?.tags ?? [] : [];

          return (
            <Td key={value} sx={tDataStyles}>
              {editing ? (
                <TagsInput
                  maxPopupHeight={300}
                  onAddTag={(params) => onAddTag(params, value)}
                  onRemoveTag={(params) => onRemoveTag(params, value)}
                  placeholder={PLACEHOLDER}
                  dataSource={projects}
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
