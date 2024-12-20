import { useEffect, useState, useRef } from 'react';
import {
  faCircleXmark,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '~/apiServices/searchServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hook';
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(true)
  const [loading, setLoading] = useState(false)

  const debounced = useDebounce(searchValue, 500)

  const inputRef = useRef()

  useEffect(() => {
    if (!debounced.trim()) {
        setSearchResult([])
      return
    }
    setLoading(true)

    // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
    // .then((res) => res.json())
    // .then(res => {
    //     setSearchResult(res.data)
    //     setLoading(false)
    // })
    // .catch((err) => {
    //     console.error(err)
    //     setLoading(false)
    // })

    // request.get(`users/search`,{
    //     params:{
    //         q:debounced,
    //         type: 'less'
    //     }
    // })
    // .then(res => {
    //     setSearchResult(res.data)
    //     setLoading(false)
    // })
    // .catch((err) => {
    //     console.error(err)
    //     setLoading(false)
    // })

    const fetchApi = async () => {
        setLoading(true)

        const result = await searchServices.search(debounced)
        setSearchResult(result)

        setLoading(false)
    }
    fetchApi()
    
  }, [debounced])

  const handleClear = () => {
    setSearchValue('')
    setSearchResult([])
    inputRef.current.focus()
  }

  const handleHideResults = () =>{
     setShowResults(false)
  }
  return ( 
      <HeadlessTippy
        interactive
        visible={showResults && searchResult.length > 0}
        render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <h4 className={cx('search-title')}>Accounts</h4>
                    {searchResult.map((result) => (
                        <AccountItem key={result.id} data={result} />
                    ))}
                     
                </PopperWrapper>
            </div>
        )}
        onClickOutside={handleHideResults}
      >
      <div className={cx('search')}>
          <input ref={inputRef} value={searchValue} placeholder="Search accounts and videos" spellCheck={false}  
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setShowResults(true)}
          />

            {/* Dấu !! trong JavaScript được sử dụng để chuyển đổi bất kỳ giá trị nào sang kiểu Boolean. 
            const searchValue = "Hello";
            console.log(!!searchValue); // true (vì chuỗi không rỗng là truthy)

            const emptyString = "";
            console.log(!!emptyString); // false (vì chuỗi rỗng là falsy) */}

          { !!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            ) }
          { loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

          <button className={cx('search-btn')}>
              <SearchIcon />
          </button>
      </div>
  </HeadlessTippy>
  );
}

export default Search;