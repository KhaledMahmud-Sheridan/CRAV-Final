# OBD-II Time Series Data Processing

The "obd2timeseries.ipynb" IPython notebook focuses on processing OBD-II time series data collected from vehicles. This data includes OBD-II parameter values logged at specific timestamps. The notebook addresses the challenge of aligning the data with the logical structure of the application, ensuring compatibility with user-defined parameters and values.

## OBD-II Time Series Collection

The OBD-II time series collection contains data received from vehicles, capturing parameter values at specific timestamps. Initially, the data posed challenges, including uniformity issues in parameter availability, value ranges, and adherence to the app's logical structure.

## Enhancements and Data Alignment

This notebook is designed to enhance the existing time series data by aligning it with the application's logic. Here's how it accomplishes this:

1. **Dynamic logParamSet List:** Rather than assuming a predefined set of parameters, the notebook allows the vehicle to provide its unique `logParamSet` list. This dynamic approach aligns with the app's flexibility.

2. **User-Selected Parameters:** The app lets users select parameters for logging. The notebook ensures that only the chosen parameters are processed, disregarding extraneous ones. This streamlines data processing and storage.

3. **Value Range Enforcement:** Inconsistencies in parameter value ranges are addressed. Values are normalized based on logical ranges defined by the `logParamSet` list, promoting data integrity.

## Usage Instructions

1. Open the "obd2timeseries.ipynb" notebook using Jupyter or a compatible environment.
2. Execute the notebook cells sequentially to observe the data processing steps.
3. The notebook dynamically incorporates the `logParamSet` list received from the vehicle, filters parameters based on user selection, and enforces value ranges.
4. Review the processed data to ensure it conforms to the logical structure of the app.

Please note that this README provides an overview. For detailed implementation steps, explanations, and code details, refer to the actual notebook.

Feel free to contribute, provide feedback, report issues, or suggest improvements. Your contributions play a vital role in refining the data processing pipeline.

---

**Author:** Dana Aljamal
**Contact:** danaaljamal94@gmail.com
