import DataFetcher from "../Fetcher/DataFetcher";
// tslint:disable-next-line:no-var-requires
const urlParser = require("url");
// tslint:disable-next-line:no-var-requires
const fs = require("fs");

const polygon = [{lat: 51.238540705037856, lng: 4.3987343460604365},
    {lat: 51.24201011992742, lng: 4.405042867246314},
    {lat: 51.23886345234508, lng: 4.423968430804029},
    {lat: 51.23111689200942, lng: 4.439417870442993},
    {lat: 51.2227233130878, lng: 4.451004950172176},
    {lat: 51.21392455368481, lng: 4.450489968850909},
    {lat: 51.20439739547577, lng: 4.440061597094616},
    {lat: 51.194868266228646, lng: 4.433366839917708},
    {lat: 51.19050682083851, lng: 4.421136033536902},
    {lat: 51.190668363214606, lng: 4.407360283192175},
    {lat: 51.19470673857574, lng: 4.394743240820339},
    {lat: 51.19729111306976, lng: 4.386761030340224},
    {lat: 51.199471566292765, lng: 4.377233875896228},
    {lat: 51.20334767276711, lng: 4.374143987968427},
    {lat: 51.20746567853312, lng: 4.383928633073095},
    {lat: 51.214893306822795, lng: 4.392812060865468},
    {lat: 51.22320759963649, lng: 4.398476855399763},
    {lat: 51.2331343510329, lng: 4.4013092526668895}];
const fromDate = "2018-08-01T00:00:00.000Z";
const toDate = "2018-08-08T00:00:00.000Z";
let summariesData = [];
let summariesTimeStamps = [];
let datafetcher = new DataFetcher();
const metric = "http://example.org/data/airquality.no2::number";
const methods: CallableFunction[] = [summariesWeekAvgHourData];
// const methods: CallableFunction[] = [summariesWeekAvgMinData, summariesWeekAvgHourData, summariesWeekAvgDayData,
// summariesWeekMedianMinData, summariesWeekMedianHourData, summariesWeekMedianDayData];
let start;
let methodIndex = -1;
let currentListener;

let timestampsSaved = true;
let dataSaved = true;

function summariesWeekAvgMinData(method: CallableFunction) {
    datafetcher = new DataFetcher();
    datafetcher.clearCache();
    currentListener = datafetcher.addDataListener(method);
    summariesData = [];
    summariesTimeStamps = [];
    start = Date.now();
    datafetcher.getPolygonObservations(polygon, fromDate, toDate, "avg", "min");
}

function summariesWeekAvgHourData(method: CallableFunction) {
    datafetcher = new DataFetcher();
    currentListener = datafetcher.addDataListener(method);
    summariesData = [];
    summariesTimeStamps = [];
    start = Date.now();
    datafetcher.getPolygonObservations(polygon, fromDate, toDate, "avg", "hour");
}

function summariesWeekAvgDayData(method: CallableFunction) {
    datafetcher = new DataFetcher();
    currentListener = datafetcher.addDataListener(method);
    summariesData = [];
    summariesTimeStamps = [];
    start = Date.now();
    datafetcher.getPolygonObservations(polygon, fromDate, toDate, "avg", "day");
}

function summariesWeekMedianMinData(method: CallableFunction) {
    datafetcher = new DataFetcher();
    currentListener = datafetcher.addDataListener(method);
    summariesData = [];
    summariesTimeStamps = [];
    start = Date.now();
    datafetcher.getPolygonObservations(polygon, fromDate, toDate, "median", "min");
}

function summariesWeekMedianHourData(method: CallableFunction) {
    datafetcher = new DataFetcher();
    currentListener = datafetcher.addDataListener(method);
    summariesData = [];
    summariesTimeStamps = [];
    start = Date.now();
    datafetcher.getPolygonObservations(polygon, fromDate, toDate, "median", "hour");
}

function summariesWeekMedianDayData(method: CallableFunction) {
    datafetcher = new DataFetcher();
    currentListener = datafetcher.addDataListener(method);
    summariesData = [];
    summariesTimeStamps = [];
    start = Date.now();
    datafetcher.getPolygonObservations(polygon, fromDate, toDate, "median", "day");
}

function onSummariesData(data) {
    const summariesLength = JSON.stringify(data).length;
    summariesTimeStamps.push(Date.now() - start);
    summariesData.push(summariesLength);
    checkTestFinished(data);
}

function checkTestFinished(data) {
    if  (new Date(data.endDateString) >= new Date(toDate) && methodIndex < methods.length) {
        const cumulSummaries = [];
        summariesData.reduce((a, b, i) => cumulSummaries[i] = a + b, 0);
        // fs.writeFile(`./src/Test/testData/cached/${methods[methodIndex].name}.txt`,
        //     JSON.stringify(cumulSummaries), (err) => {
        //         if (err) {
        //             return console.log(err);
        //         }
        //         console.log("The file was saved!");
        //         dataSaved = true;
        //         startNextSummariesWeekTest();
        //     });

        // fs.writeFile(`./src/Test/testData/cached/${methods[methodIndex].name}_timestamps.txt`,
        //     JSON.stringify(summariesTimeStamps), (err) => {
        //         if (err) {
        //             return console.log(err);
        //         }

        //         console.log("The timestamps file was saved!");
        //         timestampsSaved = true;
        //         startNextSummariesWeekTest();
        //     });
    }
}

function startNextSummariesWeekTest() {
    if (dataSaved && timestampsSaved) {
        timestampsSaved = false;
        dataSaved = false;
        methodIndex++;
        if (methodIndex < methods.length) {
            methods[methodIndex](onSummariesData);
        }
    }
}

startNextSummariesWeekTest();
