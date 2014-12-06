package org.marvellous.factory.component;

import org.marvellous.factory.system.RenderSystem.RenderLayout;

import com.badlogic.ashley.core.Component;
import com.badlogic.ashley.core.ComponentMapper;
import com.badlogic.gdx.utils.Pool.Poolable;

/**
 * A renderable component, related to RenderSystem, which contains x and y
 * position, a layout, and visual content.
 * 
 * @author NiZiL
 *
 */
public class Renderable extends Component implements Poolable {
    public static final ComponentMapper<Renderable> mapper = ComponentMapper
	    .getFor(Renderable.class);

    private RenderLayout layout = null;

    public RenderLayout getLayout() {
	return layout;
    }

    @Override
    public void reset() {
	layout = null;
    }

}
