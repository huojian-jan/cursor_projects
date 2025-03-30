package com.example.aitools.utils;

public class Validator {

    public static boolean IsValidPhoneNumber(String phoneNumber) {
        // Check if the phone number is not null and matches the pattern
        return phoneNumber != null && phoneNumber.matches("^\\+?[0-9]{10,15}$");
    }
}
