package com.example.pseudoapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.ui.AppBarConfiguration;

import com.example.pseudoapp.databinding.ActivityMainBinding;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class DailyReportActivity extends AppCompatActivity {

    private AppBarConfiguration appBarConfiguration;
    private ActivityMainBinding binding;
    private DatabaseReference databaseReference;
//    HashMap<String,ReportEntry> entries = new HashMap<String,ReportEntry>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.daily_report);

        databaseReference = FirebaseDatabase.getInstance().getReference("ReportEntries");
//        System.out.println(databaseReference.child("ReportEntries").get());
    }

    public void addEntry(View v) {
        EditText rawMaterialCost = (EditText) findViewById( R.id.editTextNumberDecimal);
        EditText todaysBusiness = (EditText) findViewById( R.id.editTextNumberDecimal2);
        String timestamp = new SimpleDateFormat("yyyy-MM-dd")
                .format(new Timestamp((new Date()).getTime()));

        ReportEntry entry = new ReportEntry();
        entry.setRawCost(Integer.valueOf(rawMaterialCost.getText().toString()));
        entry.setDaysBusiness(Integer.valueOf(todaysBusiness.getText().toString()));

        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                databaseReference.child(timestamp).setValue(entry);
                Toast.makeText(DailyReportActivity.this, "Data added", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(DailyReportActivity.this, "Fail to add data " + error, Toast.LENGTH_SHORT).show();
            }
        });
        Intent i = new Intent(this, BusinessReport.class);
        startActivity(i);
    }
}
