import React from "react";

export default class Constants {
  static subfolder = process.env.REACT_APP_SUBFOLDER;
  static apiBaseUrl = process.env.REACT_APP_API_BASEURL;
  static backgroundColorVariations = [
    "#3498DB",
    "#F1C40F",
    "#8E44AD",
    "#2C3E50",
    "#2ECC71",
    "#2980B9",
    "#F39C12",
  ];
  static defaultModalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "visible",
      border: "0",
      width: "90%",
      maxWidth: "500px", padding: "0"
    },
  };

  static transparentModalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "visible",
      border: "none",
      background: "transparent",
    },
  };

  static selectStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#83B739" : provided.backgroundColor,
    }),
    control: (provided, state) => {
      // none of react-select's styles are passed to <Control />
      console.log(state);
      return {
        ...provided,
        borderColor:
          state.isFocused || state.isSelected
            ? "#83B739"
            : provided.borderColor,
        "&:hover": {
          borderColor:
            state.isFocused || state.isSelected
              ? "#83B739"
              : provided.borderColor,
        },
      };
    },
    singleValue: (provided, state) => {
      return {
        ...provided,
        borderColor:
          state.isFocused || state.isSelected
            ? "#83B739"
            : provided.borderColor,
      };
    },
  };

  static userTypes = {
    admin: "Admin",
    superadmin: "Super Admin",
    doctor: "Doctor",
    patient: "Patient",
    hospitaladmin: "Hospital Admin",
  };

  static creditCardIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGlkPSJMYXllcl8xIj48cGF0aCBkPSJNMTM5Ljc1LDE2Ni42MjVoLTEyMC45Mzc1Yy03LjM5MDYyLDAgLTEzLjQzNzUsLTYuMDQ2ODcgLTEzLjQzNzUsLTEzLjQzNzV2LTgwLjYyNWMwLC03LjM5MDYyIDYuMDQ2ODgsLTEzLjQzNzUgMTMuNDM3NSwtMTMuNDM3NWgxMjAuOTM3NWM3LjM5MDYzLDAgMTMuNDM3NSw2LjA0Njg4IDEzLjQzNzUsMTMuNDM3NXY4MC42MjVjMCw3LjM5MDYzIC02LjA0Njg3LDEzLjQzNzUgLTEzLjQzNzUsMTMuNDM3NXoiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48cGF0aCBkPSJNMTUzLjE4NzUsMS4zNDM3NWgtMTIwLjkzNzVjLTkuNjc1LDAgLTE3LjQ2ODc1LDcuNzkzNzUgLTE3LjQ2ODc1LDE3LjQ2ODc1djI0LjE4NzVjMCwyLjI4NDM4IDEuNzQ2ODcsNC4wMzEyNSA0LjAzMTI1LDQuMDMxMjV2MGgyMi44NDM3NWMyLjI4NDM4LDAgNC4wMzEyNSwxLjc0Njg3IDQuMDMxMjUsNC4wMzEyNWMwLDIuMjg0MzggLTEuNzQ2ODcsNC4wMzEyNSAtNC4wMzEyNSw0LjAzMTI1djBoLTIyLjg0Mzc1Yy05LjY3NSwwIC0xNy40Njg3NSw3Ljc5Mzc1IC0xNy40Njg3NSwxNy40Njg3NXY4MC42MjVjMCw5LjY3NSA3Ljc5Mzc1LDE3LjQ2ODc1IDE3LjQ2ODc1LDE3LjQ2ODc1aDEyMC45Mzc1YzkuNjc1LDAgMTcuNDY4NzUsLTcuNzkzNzUgMTcuNDY4NzUsLTE3LjQ2ODc1di0zNi44MTg3NWM3LjY1OTM4LC0xLjg4MTI1IDEzLjQzNzUsLTguNzM0MzcgMTMuNDM3NSwtMTYuOTMxMjV2LTgwLjYyNWMwLC05LjY3NSAtNy43OTM3NSwtMTcuNDY4NzUgLTE3LjQ2ODc1LC0xNy40Njg3NXpNMTQ5LjE1NjI1LDE1My4xODc1YzAsNS4yNDA2MiAtNC4xNjU2Myw5LjQwNjI1IC05LjQwNjI1LDkuNDA2MjVoLTEyMC45Mzc1Yy01LjI0MDYyLDAgLTkuNDA2MjUsLTQuMTY1NjMgLTkuNDA2MjUsLTkuNDA2MjV2LTUyLjQwNjI1aDEyNy42NTYyNWMyLjI4NDM4LDAgNC4wMzEyNSwtMS43NDY4OCA0LjAzMTI1LC00LjAzMTI1di0xMy40Mzc1YzAsLTIuMjg0MzcgLTEuNzQ2ODcsLTQuMDMxMjUgLTQuMDMxMjUsLTQuMDMxMjVoLTEyNy42NTYyNXYtNi43MTg3NWMwLC01LjI0MDYyIDQuMTY1NjMsLTkuNDA2MjUgOS40MDYyNSwtOS40MDYyNWgxMjAuOTM3NWM1LjI0MDYyLDAgOS40MDYyNSw0LjE2NTYzIDkuNDA2MjUsOS40MDYyNXoiIGZpbGw9IiMwMDZlNDciPjwvcGF0aD48cGF0aCBkPSJNMTQ1LjI1OTM4LDE0Ljc4MTI1Yy0zLjIyNSwwIC02LjA0Njg3LDEuMjA5MzcgLTguMTk2ODgsMy4yMjVjLTEuMDc1LDAuOTQwNjIgLTIuNjg3NSwwLjk0MDYyIC0zLjc2MjUsMGMtMi4xNSwtMi4wMTU2MyAtNS4xMDYyNSwtMy4yMjUgLTguMTk2ODgsLTMuMjI1Yy02LjQ1LDAgLTExLjgyNSw1LjM3NSAtMTEuOTU5MzgsMTEuNjkwNjNjLTAuMTM0MzcsNi44NTMxMiA1LjI0MDYzLDEyLjQ5Njg4IDEyLjA5Mzc1LDEyLjQ5Njg4YzMuMDkwNjMsMCA2LjA0Njg4LC0xLjIwOTM4IDguMTk2ODcsLTMuMjI1YzEuMDc1LC0wLjk0MDYyIDIuNjg3NSwtMC45NDA2MiAzLjc2MjUsMGMyLjE1LDIuMDE1NjMgNC45NzE4NywzLjIyNSA4LjE5Njg3LDMuMjI1YzYuODUzMTMsMCAxMi4yMjgxMywtNS42NDM3NSAxMi4wOTM3NSwtMTIuNDk2ODdjLTAuNDAzMTIsLTYuMzE1NjMgLTUuOTEyNSwtMTEuNjkwNjIgLTEyLjIyODEyLC0xMS42OTA2MnoiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==";
}
