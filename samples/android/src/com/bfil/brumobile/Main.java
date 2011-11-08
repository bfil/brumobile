package com.bfil.brumobile;

import android.os.Bundle;

import com.bfil.brumobile.R;
import com.phonegap.*;

public class Main extends DroidGap {
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}