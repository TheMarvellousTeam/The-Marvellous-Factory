package org.marvellous.factory.component;

import com.badlogic.ashley.core.Component;
import com.badlogic.gdx.utils.Pool.Poolable;

public class Shape extends Component implements Poolable {

    public static final int EMPTY = 0;
    public static final int FULL = 1;
    public static final int INPUT = 2;
    public static final int OUTPUT = 3;

    private int xOrigin = 0, yOrigin = 0;

    private int[][] shape;

    @Override
    public void reset() {
	xOrigin = 0;
	yOrigin = 0;
	shape = null;
    }

}
