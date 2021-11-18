package com.example.pseudoapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.View;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;

public class BusinessReport extends AppCompatActivity {
    private DatabaseReference databaseReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_business_report);
    }
    @Override
    protected void onStart() {
        super.onStart();
        databaseReference = FirebaseDatabase.getInstance().getReference("ReportEntries");
        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                final TableLayout tableLayout = (TableLayout)findViewById(R.id.tableLayout);
                Context context = getApplicationContext();

                // Remove all rows except the first one
                if (tableLayout.getChildCount() > 1) {
                    tableLayout.removeViews(1, tableLayout.getChildCount() - 1);
                }

                TableRow tableRow;
                TextView textView;
                int dp_8 = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, (float) 8, context.getResources().getDisplayMetrics());
                // Set new table row layout parameters.
                TableRow.LayoutParams layoutParams = new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT);
                for(DataSnapshot miniSnap : snapshot.getChildren()){
                    HashMap<String, Object> entry = (HashMap<String, Object>) miniSnap.getValue();
                    System.out.println(entry);
                    tableRow = new TableRow(context);
                    // Set new table row layout parameters.
                    tableRow.setLayoutParams(layoutParams);
                    textView = new TextView(context);
                    textView.setText(miniSnap.getKey());
                    textView.setPadding(dp_8,dp_8,dp_8,dp_8);
                    textView.setTextColor(Color.parseColor("#FFFFFF"));
                    tableRow.addView(textView, 0);
                    textView = new TextView(context);
                    textView.setText(entry.get("rawCost").toString());
                    textView.setPadding(dp_8,dp_8,dp_8,dp_8);
                    textView.setTextColor(Color.parseColor("#FFFFFF"));
                    tableRow.addView(textView, 1);
                    textView = new TextView(context);
                    textView.setText(entry.get("daysBusiness").toString());
                    textView.setPadding(dp_8,dp_8,dp_8,dp_8);
                    textView.setTextColor(Color.parseColor("#FFFFFF"));
                    tableRow.addView(textView, 2);
                    tableLayout.addView(tableRow);
                }
                Toast.makeText(BusinessReport.this, "Data Refreshed", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(BusinessReport.this, "Fail to add data " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }
    public void addDailyReport(View v) {
        Intent i = new Intent(this, DailyReportActivity.class);
        startActivity(i);
    }
}