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
import { Task, Project } from "../models";
import {
  fetchByPath,
  getOverrideProps,
  useDataStoreBinding,
  validateField,
} from "./utils";
import { DataStore } from "aws-amplify/datastore";
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
export default function TaskCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    projectID: undefined,
    relatedTasks: "",
    ES: "",
    EF: "",
    LS: "",
    LF: "",
  };
  const [projectID, setProjectID] = React.useState(initialValues.projectID);
  const [relatedTasks, setRelatedTasks] = React.useState(
    initialValues.relatedTasks
  );
  const [ES, setES] = React.useState(initialValues.ES);
  const [EF, setEF] = React.useState(initialValues.EF);
  const [LS, setLS] = React.useState(initialValues.LS);
  const [LF, setLF] = React.useState(initialValues.LF);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setProjectID(initialValues.projectID);
    setCurrentProjectIDValue(undefined);
    setCurrentProjectIDDisplayValue("");
    setRelatedTasks(initialValues.relatedTasks);
    setES(initialValues.ES);
    setEF(initialValues.EF);
    setLS(initialValues.LS);
    setLF(initialValues.LF);
    setErrors({});
  };
  const [currentProjectIDDisplayValue, setCurrentProjectIDDisplayValue] =
    React.useState("");
  const [currentProjectIDValue, setCurrentProjectIDValue] =
    React.useState(undefined);
  const projectIDRef = React.createRef();
  const projectRecords = useDataStoreBinding({
    type: "collection",
    model: Project,
  }).items;
  const getDisplayValue = {
    projectID: (r) => `${r?.userId ? r?.userId + " - " : ""}${r?.id}`,
  };
  const validations = {
    projectID: [{ type: "Required" }],
    relatedTasks: [],
    ES: [],
    EF: [],
    LS: [],
    LF: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          projectID,
          relatedTasks,
          ES,
          EF,
          LS,
          LF,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
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
          await DataStore.save(new Task(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TaskCreateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              projectID: value,
              relatedTasks,
              ES,
              EF,
              LS,
              LF,
            };
            const result = onChange(modelFields);
            value = result?.projectID ?? value;
          }
          setProjectID(value);
          setCurrentProjectIDValue(undefined);
        }}
        currentFieldValue={currentProjectIDValue}
        label={"Project id"}
        items={projectID ? [projectID] : []}
        hasError={errors?.projectID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("projectID", currentProjectIDValue)
        }
        errorMessage={errors?.projectID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.projectID(
                projectRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentProjectIDDisplayValue(
            value
              ? getDisplayValue.projectID(
                  projectRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentProjectIDValue(value);
        }}
        inputFieldRef={projectIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Project id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Project"
          value={currentProjectIDDisplayValue}
          options={projectRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.projectID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentProjectIDValue(id);
            setCurrentProjectIDDisplayValue(label);
            runValidationTasks("projectID", label);
          }}
          onClear={() => {
            setCurrentProjectIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.projectID?.hasError) {
              runValidationTasks("projectID", value);
            }
            setCurrentProjectIDDisplayValue(value);
            setCurrentProjectIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("projectID", currentProjectIDValue)}
          errorMessage={errors.projectID?.errorMessage}
          hasError={errors.projectID?.hasError}
          ref={projectIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "projectID")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Related tasks"
        isRequired={false}
        isReadOnly={false}
        value={relatedTasks}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              projectID,
              relatedTasks: value,
              ES,
              EF,
              LS,
              LF,
            };
            const result = onChange(modelFields);
            value = result?.relatedTasks ?? value;
          }
          if (errors.relatedTasks?.hasError) {
            runValidationTasks("relatedTasks", value);
          }
          setRelatedTasks(value);
        }}
        onBlur={() => runValidationTasks("relatedTasks", relatedTasks)}
        errorMessage={errors.relatedTasks?.errorMessage}
        hasError={errors.relatedTasks?.hasError}
        {...getOverrideProps(overrides, "relatedTasks")}
      ></TextField>
      <TextField
        label="Es"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={ES}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              projectID,
              relatedTasks,
              ES: value,
              EF,
              LS,
              LF,
            };
            const result = onChange(modelFields);
            value = result?.ES ?? value;
          }
          if (errors.ES?.hasError) {
            runValidationTasks("ES", value);
          }
          setES(value);
        }}
        onBlur={() => runValidationTasks("ES", ES)}
        errorMessage={errors.ES?.errorMessage}
        hasError={errors.ES?.hasError}
        {...getOverrideProps(overrides, "ES")}
      ></TextField>
      <TextField
        label="Ef"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={EF}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              projectID,
              relatedTasks,
              ES,
              EF: value,
              LS,
              LF,
            };
            const result = onChange(modelFields);
            value = result?.EF ?? value;
          }
          if (errors.EF?.hasError) {
            runValidationTasks("EF", value);
          }
          setEF(value);
        }}
        onBlur={() => runValidationTasks("EF", EF)}
        errorMessage={errors.EF?.errorMessage}
        hasError={errors.EF?.hasError}
        {...getOverrideProps(overrides, "EF")}
      ></TextField>
      <TextField
        label="Ls"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={LS}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              projectID,
              relatedTasks,
              ES,
              EF,
              LS: value,
              LF,
            };
            const result = onChange(modelFields);
            value = result?.LS ?? value;
          }
          if (errors.LS?.hasError) {
            runValidationTasks("LS", value);
          }
          setLS(value);
        }}
        onBlur={() => runValidationTasks("LS", LS)}
        errorMessage={errors.LS?.errorMessage}
        hasError={errors.LS?.hasError}
        {...getOverrideProps(overrides, "LS")}
      ></TextField>
      <TextField
        label="Lf"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={LF}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              projectID,
              relatedTasks,
              ES,
              EF,
              LS,
              LF: value,
            };
            const result = onChange(modelFields);
            value = result?.LF ?? value;
          }
          if (errors.LF?.hasError) {
            runValidationTasks("LF", value);
          }
          setLF(value);
        }}
        onBlur={() => runValidationTasks("LF", LF)}
        errorMessage={errors.LF?.errorMessage}
        hasError={errors.LF?.hasError}
        {...getOverrideProps(overrides, "LF")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
