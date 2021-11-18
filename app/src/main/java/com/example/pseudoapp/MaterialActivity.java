package com.example.pseudoapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.InputType;
import android.util.TypedValue;
import android.view.View;
import android.widget.EditText;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;

public class MaterialActivity extends AppCompatActivity {
    private DatabaseReference databaseReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_material);
    }
    @Override
    protected void onStart() {
        super.onStart();
        databaseReference = FirebaseDatabase.getInstance().getReference("Stock");
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
                ArrayList<TextView> textViews = new ArrayList<TextView>();
                int dp_8 = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, (float) 8, context.getResources().getDisplayMetrics());
                int index = 0;
                // Set new table row layout parameters.
                TableRow.LayoutParams layoutParams = new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT);
                for(DataSnapshot miniSnap : snapshot.getChildren()){
                    HashMap<String, Object> entry = (HashMap<String, Object>) miniSnap.getValue();
                    tableRow = new TableRow(context);
                    tableRow.setLayoutParams(layoutParams);

                    TextView textView = new TextView(context);
                    textView.setId(index);
                    textView.setText(miniSnap.getKey());
                    textView.setPadding(dp_8,dp_8,dp_8,dp_8);
                    textView.setTextColor(Color.parseColor("#FFFFFF"));
                    textViews.add(textView);
                    tableRow.addView(textView, 0);

                    textView = new TextView(context);
                    textView.setId(index);
                    textView.setText(entry.get("unit").toString());
                    textView.setPadding(dp_8,dp_8,dp_8,dp_8);
                    textView.setTextColor(Color.parseColor("#FFFFFF"));
                    textViews.add(textView);
                    tableRow.addView(textView, 1);

                    textView = new TextView(context);
                    textView.setId(index);
                    textView.setText(entry.get("pUnitCost").toString());
                    textView.setPadding(dp_8,dp_8,dp_8,dp_8);
                    textView.setTextColor(Color.parseColor("#FFFFFF"));
                    textViews.add(textView);
                    tableRow.addView(textView, 2);

                    textView = new TextView(context);
                    textView.setId(index);
                    textView.setText("Edit");
                    textView.setPadding(dp_8,dp_8,dp_8,dp_8);
                    textView.setTextColor(Color.parseColor("#FFFFFF"));
                    textViews.add(textView);

                    textView.setOnClickListener(new View.OnClickListener() {
                        public void onClick(View v) {
                            TextView textView = (TextView) findViewById(v.getId());
                            EditText editText = (EditText) findViewById(v.getId());
                            textView.setVisibility(View.GONE);
                            editText.setVisibility(View.VISIBLE);
                            editText.setText(edititemname);
                        }
                    });
                    tableRow.addView(textView, 3);
                    tableLayout.addView(tableRow);
                    index++;
                }
                Toast.makeText(MaterialActivity.this, "Data Refreshed", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(MaterialActivity.this, "Fail to add data " + error, Toast.LENGTH_SHORT).show();
            }
        });
    }
    public void addDailyReport(View v) {
        Intent i = new Intent(this, DailyReportActivity.class);
        startActivity(i);
    }
}