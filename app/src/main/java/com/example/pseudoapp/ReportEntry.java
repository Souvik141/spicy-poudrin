package com.example.pseudoapp;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

class ReportEntry {
    private int rawCost;
    private int daysBusiness;
//    private String timestamp;
//    public ReportEntry() {
//        this.timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
//                .format(new Timestamp((new Date()).getTime()));
//    }
    public void setRawCost(int rawCost) { this.rawCost = rawCost; }
    public void setDaysBusiness(int daysBusiness) { this.daysBusiness = daysBusiness;}
    public int getDaysBusiness() { return daysBusiness; }
    public int getRawCost() {
            return rawCost;
        }
//    public String getTimestamp() { return timestamp; }
}
