/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getProject, listTasks } from "../graphql/queries";
import { updateProject, updateTask } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ProjectUpdateForm(props) {
  const {
    id: idProp,
    project: projectModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userId: "",
    description: "",
    title: "",
    Tasks: [],
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [title, setTitle] = React.useState(initialValues.title);
  const [Tasks, setTasks] = React.useState(initialValues.Tasks);
  const [TasksLoading, setTasksLoading] = React.useState(false);
  const [tasksRecords, setTasksRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = projectRecord
      ? { ...initialValues, ...projectRecord, Tasks: linkedTasks }
      : initialValues;
    setUserId(cleanValues.userId);
    setDescription(cleanValues.description);
    setTitle(cleanValues.title);
    setTasks(cleanValues.Tasks ?? []);
    setCurrentTasksValue(undefined);
    setCurrentTasksDisplayValue("");
    setErrors({});
  };
  const [projectRecord, setProjectRecord] = React.useState(projectModelProp);
  const [linkedTasks, setLinkedTasks] = React.useState([]);
  const canUnlinkTasks = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getProject.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getProject
        : projectModelProp;
      const linkedTasks = record?.Tasks?.items ?? [];
      setLinkedTasks(linkedTasks);
      setProjectRecord(record);
    };
    queryData();
  }, [idProp, projectModelProp]);
  React.useEffect(resetStateValues, [projectRecord, linkedTasks]);
  const [currentTasksDisplayValue, setCurrentTasksDisplayValue] =
    React.useState("");
  const [currentTasksValue, setCurrentTasksValue] = React.useState(undefined);
  const TasksRef = React.createRef();
  const getIDValue = {
    Tasks: (r) => JSON.stringify({ id: r?.id }),
  };
  const TasksIdSet = new Set(
    Array.isArray(Tasks)
      ? Tasks.map((r) => getIDValue.Tasks?.(r))
      : getIDValue.Tasks?.(Tasks)
  );
  const getDisplayValue = {
    Tasks: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    userId: [],
    description: [],
    title: [],
    Tasks: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const fetchTasksRecords = async (value) => {
    setTasksLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ title: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listTasks.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listTasks?.items;
      var loaded = result.filter(
        (item) => !TasksIdSet.has(getIDValue.Tasks?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setTasksRecords(newOptions.slice(0, autocompleteLength));
    setTasksLoading(false);
  };
  React.useEffect(() => {
    fetchTasksRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          userId: userId ?? null,
          description: description ?? null,
          title: title ?? null,
          Tasks: Tasks ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const promises = [];
          const tasksToLink = [];
          const tasksToUnLink = [];
          const tasksSet = new Set();
          const linkedTasksSet = new Set();
          Tasks.forEach((r) => tasksSet.add(getIDValue.Tasks?.(r)));
          linkedTasks.forEach((r) => linkedTasksSet.add(getIDValue.Tasks?.(r)));
          linkedTasks.forEach((r) => {
            if (!tasksSet.has(getIDValue.Tasks?.(r))) {
              tasksToUnLink.push(r);
            }
          });
          Tasks.forEach((r) => {
            if (!linkedTasksSet.has(getIDValue.Tasks?.(r))) {
              tasksToLink.push(r);
            }
          });
          tasksToUnLink.forEach((original) => {
            if (!canUnlinkTasks) {
              throw Error(
                `Task ${original.id} cannot be unlinked from Project because projectID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateTask.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    projectID: null,
                  },
                },
              })
            );
          });
          tasksToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateTask.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    projectID: projectRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            userId: modelFields.userId ?? null,
            description: modelFields.description ?? null,
            title: modelFields.title ?? null,
          };
          promises.push(
            client.graphql({
              query: updateProject.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: projectRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProjectUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              description,
              title,
              Tasks,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              description: value,
              title,
              Tasks,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              description,
              title: value,
              Tasks,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              description,
              title,
              Tasks: values,
            };
            const result = onChange(modelFields);
            values = result?.Tasks ?? values;
          }
          setTasks(values);
          setCurrentTasksValue(undefined);
          setCurrentTasksDisplayValue("");
        }}
        currentFieldValue={currentTasksValue}
        label={"Tasks"}
        items={Tasks}
        hasError={errors?.Tasks?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Tasks", currentTasksValue)
        }
        errorMessage={errors?.Tasks?.errorMessage}
        getBadgeText={getDisplayValue.Tasks}
        setFieldValue={(model) => {
          setCurrentTasksDisplayValue(
            model ? getDisplayValue.Tasks(model) : ""
          );
          setCurrentTasksValue(model);
        }}
        inputFieldRef={TasksRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Tasks"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Task"
          value={currentTasksDisplayValue}
          options={tasksRecords
            .filter((r) => !TasksIdSet.has(getIDValue.Tasks?.(r)))
            .map((r) => ({
              id: getIDValue.Tasks?.(r),
              label: getDisplayValue.Tasks?.(r),
            }))}
          isLoading={TasksLoading}
          onSelect={({ id, label }) => {
            setCurrentTasksValue(
              tasksRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTasksDisplayValue(label);
            runValidationTasks("Tasks", label);
          }}
          onClear={() => {
            setCurrentTasksDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchTasksRecords(value);
            if (errors.Tasks?.hasError) {
              runValidationTasks("Tasks", value);
            }
            setCurrentTasksDisplayValue(value);
            setCurrentTasksValue(undefined);
          }}
          onBlur={() => runValidationTasks("Tasks", currentTasksDisplayValue)}
          errorMessage={errors.Tasks?.errorMessage}
          hasError={errors.Tasks?.hasError}
          ref={TasksRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Tasks")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || projectModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || projectModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
