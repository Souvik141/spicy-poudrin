package com.example.pseudoapp;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;

import com.google.android.material.snackbar.Snackbar;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.view.View;
import android.widget.Button;

import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.example.pseudoapp.databinding.ActivityMainBinding;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import android.view.Menu;
import android.view.MenuItem;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private DatabaseReference databaseReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void showDailyReport(View v) {
        Intent i = new Intent(this, BusinessReport.class);
        startActivity(i);
    }
    public void showRawMaterialReport(View v) {
        Intent i = new Intent(this, MaterialActivity.class);
        startActivity(i);
    }

    @Override
    protected void onStart() {
        super.onStart();
        databaseReference = FirebaseDatabase.getInstance().getReference("ReportEntries");
        databaseReference.addValueEventListener(new ValueEventListener() {
            Double totalRawCost = 0.0;
            Double totalBusiness = 0.0;
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for(DataSnapshot miniSnap : snapshot.getChildren()){
                    HashMap<String, Object> entry = (HashMap<String, Object>) miniSnap.getValue();
                    totalRawCost += Double.valueOf(entry.get("rawCost").toString());
                    totalBusiness += Double.valueOf(entry.get("daysBusiness").toString());
                }
                TextView textView = (TextView) findViewById(R.id.businessRawRatio);
                textView.setText(String.valueOf(Double.valueOf(Math.round(totalBusiness * 100/totalRawCost))/100));
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(MainActivity.this, "Fail to add data " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }
}