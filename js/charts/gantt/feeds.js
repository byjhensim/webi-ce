"use strict";

exports.feeds = {
  feeds: [
    {
      id: "task-id",
      name: "Task Id",
      description:
        "Specifying task id. If not supplied, will be automatically assigned by the service",
      axis: "0",
      type: "dimension",
      min: "0",
      max: "1",
    },
    {
      id: "task-name",
      name: "Task Name - unique",
      description: "Task Name",
      axis: "0",
      type: "dimension",
      min: "1",
      max: "1",
    },
    {
      id: "resource-id",
      name: "Task Group",
      description: "Specifying group identity for tasks",
      axis: "0",
      type: "dimension",
      min: "0",
      max: "1",
    },
    {
      id: "start",
      name: "Start - MM/DD/YYYY",
      description: "Specifying when the task starts",
      axis: "0",
      type: "dimension",
      min: "0",
      max: "1",
    },
    {
      id: "end",
      name: "End - MM/DD/YYYY",
      description: "Specifying when the task ends",
      axis: "0",
      type: "dimension",
      min: "0",
      max: "1",
    },
    {
      id: "duration",
      name: "Duration - in days",
      description: "Specifying duration of the task",
      type: "measure",
      min: "0",
      max: "1",
    },
    {
      id: "completeness",
      name: "Percent Complete - in %",
      description: "Specifying the progress of the task",
      type: "measure",
      min: "1",
      max: "1",
    },
    {
      id: "dependencies",
      name: "Task Depended",
      description: "Specifying what task precede by the task",
      axis: "0",
      type: "dimension",
      min: "0",
      max: "1",
    },
  ],
};

exports.header = [
  {
    id: "task-id",
    header: { label: "Task ID", type: "string" },
  },
  {
    id: "task-name",
    header: { label: "Task Name", type: "string" },
  },
  {
    id: "resource-id",
    header: { label: "Resource", type: "string" },
  },
  {
    id: "start",
    header: { label: "Start Date", type: "date" },
  },
  {
    id: "end",
    header: { label: "End Date", type: "date" },
  },
  {
    id: "duration",
    header: { label: "Duration", type: "number" },
  },
  {
    id: "completeness",
    header: { label: "Percent Complete", type: "number" },
  },
  {
    id: "dependencies",
    header: { label: "Dependencies", type: "string" },
  },
];
