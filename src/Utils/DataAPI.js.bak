import APICall from "./APICall";
import React from "react";

export default class DataAPI {

    static specializationsList(callback) {
        APICall("api/specializations/masterlist", "GET", null)
            .then((data) => {
                var response = data.data;
                if (response.isSuccess) {
                    callback(response.data, null);
                } else {
                    callback(null, response.message);
                }
            }).catch((error) => {
                callback(null, "Please check your connection");
            });
    }

}