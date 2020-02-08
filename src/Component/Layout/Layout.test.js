import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import Layout from './Layout'
import TutWin from '../../HOC/tutWin/tutWin'


//connect enzyme
configure({adapter: new Adapter()});

describe('<tutWin/>', () => {
    it('Shouldnt render <tutWin> if it was never played before.', ()  => {
        const wrapper = shallow(<Layout/>)
        wrapper.setState({ playTut:true });
 
        expect(wrapper.find(TutWin)).toHaveLength(1);
    })

    it('Shouldnt not render  <tutWin> if  tutorial was played already.', ()  => {
        const wrapper = shallow(<Layout/>)
        wrapper.setState({ playTut:false });
 
        expect(wrapper.find(TutWin)).toHaveLength(0);
    })
})