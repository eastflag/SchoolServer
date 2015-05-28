package com.aura.smartschool.result;

public class Result<T> {
	private int result = 0;
	private String msg;
	private T data;

	public Result(T data) {
		this.data = data;
	}

	public Result(int result, T data) {
		this.result = result;
		this.data = data;
	}

	public Result(int result, String msg) {
		this.result = result;
		this.msg = msg;
	}

	public Result(int result, String msg, T data) {
		this.result = result;
		this.msg = msg;
		this.data = data;
	}

	public int getResult() {
		return result;
	}
	public void setResult(int result) {
		this.result = result;
	}

	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}


    public String getMsg()
    {
    	return msg;
    }
    public void setMsg(String msg)
    {
    	this.msg = msg;
    }
}
