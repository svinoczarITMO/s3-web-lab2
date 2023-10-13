package data;

import java.io.Serializable;

public class CollisionData implements Serializable {
    private boolean collision;
    private float x;
    private float y;
    private float R;
    private String time;
    private String executionTime;

    public CollisionData() {
        this.collision = false;
        this.x = 0;
        this.y = 0;
        this.R = 0;
        this.time = "1970.01.01 12:00:00";
        this.executionTime = "0";
    }

    public CollisionData(boolean collision, float x, float y, float R, String time, String executionTime) {
        this.collision = collision;
        this.x = x;
        this.y = y;
        this.R = R;
        this.time = time;
        this.executionTime = executionTime;
    }

    public boolean isCollision() {
        return collision;
    }

    public void setCollision(boolean collision) {
        this.collision = collision;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getR() {
        return R;
    }

    public void setR(float r) {
        R = r;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(String executionTime) {
        this.executionTime = executionTime;
    }
}
