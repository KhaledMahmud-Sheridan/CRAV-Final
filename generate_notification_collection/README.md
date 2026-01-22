# Notification Collection and Analysis

This IPython notebook, named "notificationCollection.ipynb," demonstrates the process of initializing a notification collection, correlating OBD-II parameters with potential faults, and notifying the client based on threshold values. Additionally, it covers initializing a vehicle with notifications, extracting data from "vehicle3," and saving the updated data.

## Initialization of Notification Collection

In this section, we initialize a notification collection with a standard notification and 19 other notifications. These notifications are designed to capture potential vehicle faults based on OBD-II parameters and threshold values within a random range of (-70 to -20).

## Correlating OBD-II Parameters with Faults

We leverage research to establish a connection between specific OBD-II parameters and potential faults. By defining threshold values, we identify cases where parameter values indicate the likelihood of a fault occurring. These threshold values are randomly generated within the specified range.

## Notifying the Client

The primary use case of the "notificationCollection" notebook is to enable real-time alerts to clients when OBD-II parameter values match predefined thresholds. When the notebook receives parameter values from the vehicle, it compares these values with the established thresholds and sends an alert to the client if a potential fault is detected. The alert includes the name of the associated fault.

## Initializing a Vehicle with Notifications

We extend the functionality of the notebook by initializing a vehicle using data sourced from the "vehicle3" file. This data is used to create three notifications specific to the vehicle. The process involves extracting relevant information from the file and integrating it into the notification system.

## Saving Updated Vehicle Data

After initializing the vehicle with notifications, the notebook ensures that the updated data is saved for future use. The new information, including the added notifications, is persisted to maintain the integrity of the dataset.

## Usage

1. Open the "notificationCollection.ipynb" notebook in Jupyter or a compatible environment.
2. Run the cells sequentially to see the initialization of the notification collection, the correlation of OBD-II parameters with faults, and the notification process.
3. Follow the steps to initialize the vehicle using data from "vehicle3" and save the updated data.

Please note that this README is a high-level overview. Refer to the actual notebook for detailed code implementation and explanations.

Feel free to provide feedback, report issues, or suggest improvements. Your contributions are highly appreciated.

---

**Author:** Dana Aljamal
**Contact:** danaaljamal94@gmail.com
