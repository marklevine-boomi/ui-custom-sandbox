declare var manywho: any;

import * as React from 'react';
import './IComponentProps.ts';

// Cannot use 'Image' for component name as it clashes with the browser native window.Image class
const CustomImage: React.SFC<IComponentProps> = ({ id, parentId, flowKey }) => {

    const classes = manywho.styling.getClasses(parentId, id, 'image', flowKey);
    const model = manywho.model.getComponent(id, flowKey);
    const outcomes = manywho.model.getOutcomes(id, flowKey);
    const label = model.label;
    const state = manywho.state.getComponent(id, flowKey) || {};
    
    const contentValue = state && state.contentValue !== undefined ? state.contentValue : model.contentValue;

    const outcomeButtons = outcomes && outcomes.map(function (outcome: any) {
        return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: flowKey });
    }, this);

    if (model.isVisible !== true) {

        classes.push('hidden');

    }

    return (
        <div className={classes.join(' ')} id={id}>
            {
                !manywho.utils.isNullOrWhitespace(label) ? <label className={'img-label'}>{label}</label> : null
            }
            <img className="img-responsive" src={contentValue} alt={model.developerName} id={id} />
            {outcomeButtons}
        </div>
    );
};

manywho.component.register('custom-image', CustomImage);

export default CustomImage;