package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.edutech.progressive.entity.Accounts;

public class AccountServiceImplArraylist {
    public List<Accounts> getAllAccounts() throws SQLException {
        return new ArrayList<>(); 
    }

    public int addAccount(Accounts accounts) throws SQLException {
        return -1;
    }

    public List<Accounts> getAllAccountsSortedByBalance() throws SQLException {
        return new ArrayList<>(); 
    }

    public void emptyArrayList() {
    }
}
