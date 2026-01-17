package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.edutech.progressive.entity.Accounts;

public class AccountServiceImplArraylist {

    private List<Accounts> accountList = new ArrayList<>();

    public List<Accounts> getAllAccounts() throws SQLException {
        // return new ArrayList<>(accountList);
        return accountList;
    }

    public int addAccount(Accounts accounts) throws SQLException {
        accountList.add(accounts);
        return accountList.size();
    }

    public List<Accounts> getAllAccountsSortedByBalance() throws SQLException {
        List<Accounts> sortedList = new ArrayList<>(accountList);
        Collections.sort(sortedList); 
        return sortedList;
    }

    public void emptyArrayList() {
        accountList = new ArrayList<>();
    }

    public Accounts getAccountById(int accountId) {
        for (Accounts a : accountList) {
            if (a.getAccountId() == accountId) return a;
        }
        return null;
    }
}
