package data;

import java.io.Serializable;

public final class CollisionData implements Serializable {
    private final boolean collision;
    private final float x;
    private final float y;
    private final float R;
    private final String time;
    private final String executionTime;

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

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }


    public float getR() {
        return R;
    }

    public String getTime() {
        return time;
    }

    public String getExecutionTime() {
        return executionTime;
    }
}
