export default function (order, placesToClean, configObject) {

    if (!configObject) {
        configObject = JSON.parse(localStorage.getItem('quote-config'));
        if (!configObject) return 0;
    }

    if (!order) return 0;
    var finalAmount = 0, basePrice = 0, hundred = 100;
    try {
        var customerLocation = configObject.locationsList.find(a => a.id == order.LocationId);
        if (customerLocation) {
            basePrice = customerLocation.basePrice;
            finalAmount += basePrice;

            //housetype or premises type
            if (order.OrderTypeDetails && order.OrderTypeDetails.trim() != "") {
                var customerPremisesType = configObject.houseTypes.find(a => a.houseType == order.OrderTypeDetails);
                if (customerPremisesType) {
                    if (customerPremisesType.priceMultiplier > 0) {
                        finalAmount += (customerPremisesType.priceMultiplier / hundred) * basePrice;
                    }
                }
            }

            placesToClean = placesToClean.filter(a=> parseFloat(a.RoomCount.toString()) > 0);
            //consideration for places/rooms to clean
            if (placesToClean && placesToClean.length > 0) {
                placesToClean.forEach(place => {
                    if (parseFloat(place.RoomCount) > 0) {
                        //consider each room/place
                        var thisPlaceType = configObject.roomTypes.find(a => a.roomType == place.RoomType);
                        if (!thisPlaceType) {
                            //placetype not found, use the highest available amount in config
                            thisPlaceType = configObject.mostExpensiveRoom;
                        }
                        finalAmount += ((thisPlaceType.priceMultiplier / hundred) * basePrice) * parseFloat(place.RoomCount);
                        //end of individual room/place type 

                        //consider the floor for the current room
                        var thisFloorType = configObject.floorTypes.find(a => a.id == place.FloorType);
                        if (!thisFloorType) {
                            thisFloorType = configObject.mostExpensiveFloorType;
                        }
                        finalAmount += ((thisFloorType.priceMultiplier / hundred) * basePrice) * parseFloat(place.RoomCount);
                        //end of floor type consideration 
                    }
                });
            }else{
                return null;
            }

            //consider which day of the week was selected
            var dayOfWeekRequested = null;
            if (order.ServiceDate) {
                var isPublicHoliday = configObject.publicHolidays.find(a => (new Date(a.holidayDate).getUTCFullYear() == order.ServiceDate.getUTCFullYear()) && (new Date(a.holidayDate).getUTCMonth() == order.ServiceDate.getUTCMonth()) && (new Date(a.holidayDate).getUTCDate() == order.ServiceDate.getUTCDate()));
                if (isPublicHoliday) {
                    dayOfWeekRequested = configObject.publicHolidayDayType;
                }

                if (!dayOfWeekRequested) {
                    var dayRequested = order.ServiceDate.getDay() + 1;
                    dayOfWeekRequested = configObject.dayTypes.find(a => a.memberDays.includes(dayRequested.toString()));
                }
            }

            if (!dayOfWeekRequested) {
                dayOfWeekRequested = configObject.mostExpensiveDay;
            }
            finalAmount += (dayOfWeekRequested.priceMultiplier / hundred) * basePrice;
            //end of day of the week consideration

            //Frequency or repeat order consideration
            var orderFrequency = null;
            if (order.Frequency && order.Frequency.trim() != "") {
                orderFrequency = configObject.orderFrequencies.find(a => a.frequency == order.Frequency);
            }
            if (!orderFrequency) {
                orderFrequency = configObject.orderFrequencyDefault;
            }
            if (orderFrequency) {
                finalAmount += (orderFrequency.priceMultiplier / hundred) * basePrice;
            }
            //end of frequency or repeat orders
        }else{
            return null
        }
    }
    catch (e) {
        console.log(e);
    }
    return {
        quote: finalAmount,
        formatted: Number(parseFloat(finalAmount).toFixed(2)).toLocaleString('en', {
            minimumFractionDigits: 2
        })
    };


}